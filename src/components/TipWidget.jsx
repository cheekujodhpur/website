import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const RAZORPAY_KEY = process.env.GATSBY_RAZORPAY_KEY_ID;
const API_URL = process.env.GATSBY_NEWSLETTER_API_URL;
const PRESETS = [100, 200, 500];

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.accent5.bg};
  padding: 4em 0;
  text-align: center;

  .inner {
    margin: 0 auto;
    max-width: 38em;
    padding: 0 2em;
  }

  h3 {
    color: ${({ theme }) => theme.colors.accent5.fgBold};
    font-size: 1.4em;
    font-weight: ${({ theme }) => theme.fonts.weightBold};
    letter-spacing: 0;
    text-transform: none;
    margin: 0 0 0.4em;
  }

  p {
    color: ${({ theme }) => theme.colors.accent5.fg};
    font-size: 0.9em;
    letter-spacing: ${({ theme }) => theme.size.letterSpacing};
    margin: 0 0 1.5em;
    text-transform: uppercase;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
    padding: 3em 2em;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0.6em;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1.2em;
`;

const PresetBtn = styled.button`
  appearance: none;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.accent5.border2Bg : 'transparent'};
  border: none;
  border-radius: 3px;
  box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.accent5.border};
  color: ${({ theme }) => theme.colors.accent5.fgBold};
  cursor: pointer;
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: 0.8em;
  font-weight: ${({ theme }) => theme.fonts.weightBold};
  letter-spacing: ${({ theme }) => theme.size.letterSpacingAlt};
  padding: 0 1.5em;
  text-transform: uppercase;
  box-sizing: border-box;
  transition: background-color ${({ theme }) => theme.duration.transitions} ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent5.borderBg};
  }
`;

const CustomInput = styled.input`
  width: 6.5em;
  padding: 0 0.75em;
  height: ${({ theme }) => theme.size.elementHeight};
  font-size: 0.9em;
  font-family: ${({ theme }) => theme.fonts.family};
  border: none;
  border-radius: 3px;
  outline: none;
  color: #333;
  box-sizing: border-box;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;

  &::placeholder {
    color: #aaa;
  }
`;

const SendBtn = styled.button`
  appearance: none;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 3px;
  box-shadow: none;
  color: ${({ theme }) => theme.colors.accent5.bg};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: 0.85em;
  font-weight: ${({ theme }) => theme.fonts.weightBold};
  letter-spacing: ${({ theme }) => theme.size.letterSpacingAlt};
  padding: 0.75em 2em;
  text-transform: uppercase;
  box-sizing: border-box;
  transition: background-color ${({ theme }) => theme.duration.transitions} ease,
              opacity ${({ theme }) => theme.duration.transitions} ease;

  &:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const ErrorMsg = styled.p`
  margin-top: 1em !important;
  margin-bottom: 0 !important;
  text-transform: none !important;
  letter-spacing: normal !important;
  color: #ffb3b3 !important;
`;

const TipWidget = () => {
  const [selected, setSelected] = useState(PRESETS[0]);
  const [custom, setCustom] = useState('');
  const [scriptReady, setScriptReady] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      setScriptReady(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setScriptReady(true);
    document.body.appendChild(script);
  }, []);

  const amount = custom ? (parseInt(custom, 10) || 0) : selected;
  const isValid = amount >= 1;

  const handlePay = async () => {
    if (!scriptReady || !isValid) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(`${API_URL}/tip/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amount * 100 }),
      });
      const order = await res.json();
      if (!res.ok) throw new Error(order.error || 'Could not create order');

      const rzp = new window.Razorpay({
        key: RAZORPAY_KEY,
        order_id: order.order_id,
        amount: order.amount,
        currency: order.currency,
        name: 'Kumar Ayush',
        description: 'Tip / दक्षिणा',
        handler: async (response) => {
          try {
            const vres = await fetch(`${API_URL}/tip/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const vdata = await vres.json();
            if (!vres.ok || !vdata.success) throw new Error('Verification failed');
            setStatus('done');
          } catch {
            setStatus('error');
            setErrorMsg('Payment received but could not verify. Please email me and include the payment ID: ' + response.razorpay_payment_id);
          }
        },
        modal: {
          ondismiss: () => setStatus('idle'),
        },
      });

      rzp.open();
      setStatus('idle');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Try again.');
    }
  };

  if (status === 'done') {
    return (
      <Section>
        <div className="inner">
          <h3>Thank you!</h3>
          <p>Your support means a lot.</p>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="inner">
        <h3>दक्षिणा (Tip)</h3>
        <p>Money is not real, but your support towards maintaining this body and mind is valuable.</p>
        <Row>
          {PRESETS.map((amt) => (
            <PresetBtn
              key={amt}
              $active={!custom && selected === amt}
              onClick={() => { setSelected(amt); setCustom(''); }}
            >
              ₹{amt}
            </PresetBtn>
          ))}
          <CustomInput
            type="number"
            min="1"
            placeholder="Custom"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
          />
        </Row>
        <SendBtn onClick={handlePay} disabled={status === 'loading' || !isValid}>
          {status === 'loading' ? 'Processing...' : `Send ₹${isValid ? amount : '—'}`}
        </SendBtn>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      </div>
    </Section>
  );
};

export default TipWidget;
