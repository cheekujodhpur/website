---
layout: blog
title: "I am a dirty credit card lover"
date: 2026-09-20T00:00:00.000Z
categories:
  - finance
  - current
---

Merchants will have to pay a fee to their banks when they use UPI. There is outrage, this is news, and to me, it is good news. My favourite part about this opinion piece is that I have not bothered to read the *why now* part of this change. I have always had my own reasons to believe that we should, and hence am pretty pleased with this development.

Patrick McKenzie does an excellent [explainer of what payment means](https://www.bitsaboutmoney.com/archive/bank-transfers-as-a-payment-method/), and how it is not the same thing as a bank transfer.

> Stripped to its fundamentals: a payment is a message, with new information, about a debt, with a certain confidence level associated with it.

> In credit cards, a brief and intentionally simplified version of the actions of the payment rail is: you agree with your bank that you owe them $4, your bank agrees with a credit card network that it owes a particular processor almost $4 (taking a fee), and the credit card processor agrees with the cafe that it owes them a bit less than $4 (taking another fee).

Patrick lists out *cost, UX, certainty, settlement time and reversibility* as features of payment systems. UPI offers everything else, but sacrifices reversibility in favour of finality of a transaction. This is a critical trade-off. An important feature of credit cards is that you can dispute a transaction against a merchant. This could be an ex-post fraud mitigation situation or quite simply, you did not like the service provided but the merchant does not agree, so you get your payment provider to intervene. Why would they do that? Because they earn a fee from you; this is part of the service agreement. Ex-ante fraud mitigation is another thing altogether. It is arguably one of the greatest costs for a payment provider. UPI providers simply don't do this.

It is much more convenient for me to tap my credit card instead of scanning a QR code and entering a 4 or 6 digit PIN. A lot of people point out to me that this is a minor inconvenience in exchange for security, which is true, but due to the low cost of UPI, market participants are blocked off from demonstrating an alternative.

There is another feature which UPI does not have as pointed out by Patrick.

> **Payment authorization is not linked with banking information**. Without the user in the loop to authorize the transaction in real time, possession of a VPA is essentially worthless. This is very not true of banking credentials in, most notably, the U.S. Knowing a bank account number in the U.S. is sufficient to try debiting it, and bank account numbers are also passed around promiscuously, such as on checks (in carefully designed block print to make these security tokens *even more readable*). Credit card numbers have the same problem.

> This is a very important *design choice.* It optimizes for customer security but pessimizes for payment convenience. Most transactions (by count and by transaction amount) are repeated transactions; much of the payments industry exists to make repeated transactions less frictionful for all parties. SaaS is one salient example, but rent and mortgages are typically fixed amounts on a fixed schedule between repeated parties, most e-commerce merchants will hope the user comes back (and want to charge their credentials on file rather than forcing a re-authentication), etc etc. **UPI adds substantial friction to repeat transactions** compared to how bank transfers are implemented in many countries.

Indians cannot imagine their account being debited without explicit information, and that is not a good thing. Security costs passed on to the individuals are costlier than building institutions that can socialise them. If the government funds the security cost, that is simply a case of government financing a club good, which is also socialising the cost, but to everyone instead of only the people using the service.

The fees that go to service providers is a pathway to better fraud protection. Also, from a consumer's perspective, UPI MDR applies only to transactions above 2k INR. These are <4% of transactions as per NPCI data. It is likely that you are at a store which also accepts cards as a payment method, in which case, a payment fee is baked into the price that you pay already. Online stores would go via services like PayU or Razorpay to handle a multiverse of payment methods, and they pay an aggregated cost to these services which is not zero. Some small town merchants (and IRCTC) apply the payment fees on top of your bill based on the mode of payment, but I am not sure if those numbers are significant. Thus, I am almost always paying a payment fee even if I use UPI. The lowest cost mode in an aggregated cost passthru suffers the largest marginal cost.

The outrage is comical, because India being India has also exempted merchants below a certain turnover and capped the fees on essential services bill payments. 40 bps of MDR is 5x lower than 200 bps for typical credit cards.

In summary, I wanted to make two points here:

1. Patrick's blog is excellent. I wanted to reshare this post from 5 years ago.
2. I want better customer protection on my payments, and I do not see that happening in a sustainable fashion without my payment providers earning more in fees.

***Caveat lector*** - Since Patrick's blog came out, we have UPI AutoPay which has a ceiling and pre-debit notifications. There are also continuous improvements in fraud protection measures. However, these are costlier and a step behind what credit card networks can provide simply due to the design choice of [finality](https://www.bitsaboutmoney.com/archive/no-payments-are-final/). These developments are moot counters because we have clearly felt a need to finance their cost against fees.
