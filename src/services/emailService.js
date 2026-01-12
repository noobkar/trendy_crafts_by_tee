import emailjs from '@emailjs/browser';

// Keys provided by user
const SERVICE_ID = 'service_szj61vl';
const TEMPLATE_ID = 'template_4esjzmp';
const PUBLIC_KEY = 's-W91BBpwbABvkRv6';

export const initEmail = () => {
    emailjs.init({
        publicKey: PUBLIC_KEY,
    });
};

export const sendContactEmail = async (formData) => {
    try {
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            email: 'zaveenm@gmail.com', // Matched to {{email}} in dashboard
            reply_to: formData.email
        };

        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        return { success: true, response };
    } catch (error) {
        console.error('Email Error:', error);
        return { success: false, error };
    }
};

export const sendOrderEmail = async (orderData) => {
    try {
        const { items, total, customer } = orderData;
        
        // Format items list for email
        const itemsHtml = items.map(item => 
            `- ${item.title} (x${item.quantity}): $${(item.price * item.quantity).toFixed(2)}`
        ).join('\n');

        const templateParams = {
            from_name: customer.name,
            from_email: customer.email,
            email: 'zaveenm@gmail.com', // Matched to {{email}} in dashboard
            message: `
New Order Received!

ORDER DETAILS:
----------------
${itemsHtml}
----------------
TOTAL: $${total}

CUSTOMER INFO:
Name: ${customer.name}
Email: ${customer.email}
Address: ${customer.address}, ${customer.city}
Instructions: ${customer.instructions || 'None'}
            `,
            reply_to: customer.email
        };

        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        return { success: true, response };
    } catch (error) {
        console.error('Email Error:', error);
        return { success: false, error };
    }
};
