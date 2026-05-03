import twilio from 'twilio';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phones, message } = req.body;

  if (!phones || !message) {
    return res.status(400).json({ error: 'Missing phones or message' });
  }
  
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  const results = [];
  for (const phone of phones) {
    try {
      let formattedPhone = phone.replace(/[\s\-\+]/g, '');
      if (formattedPhone.startsWith('91') && formattedPhone.length === 12) {
        formattedPhone = formattedPhone.substring(2);
      }
      
      const msg = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+91${formattedPhone}`
      });
      
      console.log(`Twilio: SMS sent to ${phone}, SID: ${msg.sid}`);
      results.push({ phone, success: true, sid: msg.sid });
    } catch (error) {
      console.error(`Twilio Error for ${phone}:`, error.message);
      results.push({ phone, success: false, error: error.message });
    }
  }

  return res.status(200).json({ success: true, results });
}
