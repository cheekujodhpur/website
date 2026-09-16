import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.accent1.bg};
  padding: 4em 0;
  text-align: center;

  .inner {
    margin: 0 auto;
    max-width: 38em;
    padding: 0 2em;
  }

  h3 {
    color: ${({ theme }) => theme.colors.accent1.fgBold};
    font-size: 1.4em;
    font-weight: ${({ theme }) => theme.fonts.weightBold};
    margin: 0 0 0.4em;
  }

  p {
    color: ${({ theme }) => theme.colors.accent1.fg};
    font-size: 0.9em;
    letter-spacing: ${({ theme }) => theme.size.letterSpacing};
    margin: 0 0 1.5em;
    text-transform: uppercase;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
    padding: 3em 2em;
  }
`;

const Form = styled.form`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 0.6em;
  max-width: 28em;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.xsmall}) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0 1em;
  height: ${({ theme }) => theme.size.elementHeight};
  font-size: 0.9em;
  font-family: ${({ theme }) => theme.fonts.family};
  border: none;
  outline: none;
  color: #333;
  box-sizing: border-box;

  &::placeholder {
    color: #aaa;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xsmall}) {
    width: 100%;
  }
`;

const Button = styled.button`
  appearance: none;
  background-color: transparent;
  border: none;
  border-radius: 3px;
  box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.accent1.border};
  color: ${({ theme }) => theme.colors.accent1.fgBold};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: 0.8em;
  font-weight: ${({ theme }) => theme.fonts.weightBold};
  height: ${({ theme }) => theme.size.elementHeight};
  line-height: ${({ theme }) => theme.size.elementHeight};
  letter-spacing: ${({ theme }) => theme.size.letterSpacingAlt};
  padding: 0 1.5em;
  text-transform: uppercase;
  white-space: nowrap;
  box-sizing: border-box;
  transition: background-color ${({ theme }) => theme.duration.transitions} ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.accent1.borderBg};
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xsmall}) {
    width: 100%;
  }
`;

const StatusMessage = styled.p`
  margin: 1em 0 0 !important;
  font-size: 0.85em !important;
  text-transform: none !important;
  letter-spacing: normal !important;
  color: ${({ $error, theme }) =>
    $error ? '#ffb3ae' : theme.colors.accent1.fgBold} !important;
`;

const NEWSLETTER_API_URL = process.env.GATSBY_NEWSLETTER_API_URL;
const IS_DEV = process.env.NODE_ENV === 'development';

async function mockSubscribe() {
  await new Promise(r => setTimeout(r, 800));
  return { ok: true, data: { message: 'Check your inbox to confirm your subscription.' } };
}

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      let ok, data;
      if (IS_DEV) {
        ({ ok, data } = await mockSubscribe());
      } else {
        const res = await fetch(`${NEWSLETTER_API_URL}/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        data = await res.json();
        ok = res.ok;
      }
      if (ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Could not connect. Try again later.');
    }
  };

  return (
    <Section>
      <div className="inner">
        <h3>Get new posts by email</h3>
        {status !== 'success' && (
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
            />
            <Button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Subscribe'}
            </Button>
          </Form>
        )}
        {message && (
          <StatusMessage $error={status === 'error'}>{message}</StatusMessage>
        )}
      </div>
    </Section>
  );
};

export default SubscribeForm;
