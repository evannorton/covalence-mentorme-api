import env from '../config';
import stripeLib from 'stripe';

const stripe = stripeLib(env.STRIPE_SECRET);

function createAccount(email) {
    return stripe.accounts.create({
        country: 'US',
        type: 'custom',
        email,
        legal_entity: {
            personal_id_number: '000000000',
            business_tax_id: '000000000'
        },
        external_account: {
            object: 'bank_account',
            account_number: '000123456789',
            country: 'US',
            currency: 'USD',
            routing_number: '110000000'
        },
        tos_acceptance: {
            date: 1521058117,
            ip: '50.236.14.186'
        }
    });
}

function createCustomer(email) {
    return stripe.customers.create({
        email,
        source: 'tok_visa'
    });
}


function createCharge(amount, customerId, accountId) {
    return stripe.charges.create({
        amount,
        currency: 'usd',
        customer: customerId,
        destination: accountId,
        application_fee: Math.ceil(amount * 0.05) // 5% application fee
    });
}

export { createAccount, createCustomer, createCharge };
