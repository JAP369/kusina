# Contact Form Implementation Guide

The contact page has been created at `/contact` with a fully styled form. Here are several options to make it functional:

## Option 1: Email Service (Recommended for Quick Setup)

### A. Using EmailJS (Free tier available)

1. **Sign up for EmailJS**: https://www.emailjs.com/
2. **Install the package**:
   ```bash
   npm install @emailjs/browser
   ```

3. **Update the contact page** (`/app/contact/page.tsx`):
   ```typescript
   import emailjs from '@emailjs/browser';
   
   // In your handleSubmit function:
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);
     
     try {
       await emailjs.send(
         'YOUR_SERVICE_ID',
         'YOUR_TEMPLATE_ID',
         {
           from_name: formData.name,
           from_email: formData.email,
           phone: formData.phone,
           subject: formData.subject,
           message: formData.message,
         },
         'YOUR_PUBLIC_KEY'
       );
       
       setSubmitStatus('success');
       setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
     } catch (error) {
       setSubmitStatus('error');
     } finally {
       setIsSubmitting(false);
     }
   };
   ```

### B. Using Resend (Modern Email API)

1. **Install Resend**:
   ```bash
   npm install resend
   ```

2. **Create API route** (`/app/api/contact/route.ts`):
   ```typescript
   import { Resend } from 'resend';
   import { NextResponse } from 'next/server';

   const resend = new Resend(process.env.RESEND_API_KEY);

   export async function POST(request: Request) {
     try {
       const { name, email, phone, subject, message } = await request.json();

       const data = await resend.emails.send({
         from: 'Kusina Contact <onboarding@resend.dev>',
         to: 'your-email@example.com',
         subject: \`Contact Form: \${subject}\`,
         html: \`
           <h2>New Contact Form Submission</h2>
           <p><strong>Name:</strong> \${name}</p>
           <p><strong>Email:</strong> \${email}</p>
           <p><strong>Phone:</strong> \${phone}</p>
           <p><strong>Subject:</strong> \${subject}</p>
           <p><strong>Message:</strong></p>
           <p>\${message}</p>
         \`,
       });

       return NextResponse.json(data);
     } catch (error) {
       return NextResponse.json({ error }, { status: 500 });
     }
   }
   ```

3. **Update contact page**:
   ```typescript
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);
     
     try {
       const response = await fetch('/api/contact', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData),
       });
       
       if (response.ok) {
         setSubmitStatus('success');
         setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
       } else {
         setSubmitStatus('error');
       }
     } catch (error) {
       setSubmitStatus('error');
     } finally {
       setIsSubmitting(false);
     }
   };
   ```

4. **Add to `.env.local`**:
   ```
   RESEND_API_KEY=your_resend_api_key
   ```

## Option 2: Form Submission Services

### A. Formspree (No backend needed)

1. **Sign up**: https://formspree.io/
2. **Get your form endpoint**
3. **Update contact page**:
   ```typescript
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);
     
     try {
       const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData),
       });
       
       if (response.ok) {
         setSubmitStatus('success');
         setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
       } else {
         setSubmitStatus('error');
       }
     } catch (error) {
       setSubmitStatus('error');
     } finally {
       setIsSubmitting(false);
     }
   };
   ```

### B. Web3Forms (Free, No signup)

1. **Get API key**: https://web3forms.com/
2. **Update contact page**:
   ```typescript
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);
     
     try {
       const response = await fetch('https://api.web3forms.com/submit', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           access_key: 'YOUR_ACCESS_KEY',
           ...formData,
         }),
       });
       
       const result = await response.json();
       
       if (result.success) {
         setSubmitStatus('success');
         setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
       } else {
         setSubmitStatus('error');
       }
     } catch (error) {
       setSubmitStatus('error');
     } finally {
       setIsSubmitting(false);
     }
   };
   ```

## Option 3: Database Storage + Email Notification

### Using Prisma + PostgreSQL + Resend

1. **Install dependencies**:
   ```bash
   npm install prisma @prisma/client resend
   npx prisma init
   ```

2. **Create schema** (`prisma/schema.prisma`):
   ```prisma
   model ContactSubmission {
     id        String   @id @default(cuid())
     name      String
     email     String
     phone     String?
     subject   String
     message   String
     createdAt DateTime @default(now())
   }
   ```

3. **Create API route** (`/app/api/contact/route.ts`):
   ```typescript
   import { PrismaClient } from '@prisma/client';
   import { Resend } from 'resend';
   import { NextResponse } from 'next/server';

   const prisma = new PrismaClient();
   const resend = new Resend(process.env.RESEND_API_KEY);

   export async function POST(request: Request) {
     try {
       const data = await request.json();
       
       // Save to database
       const submission = await prisma.contactSubmission.create({
         data: {
           name: data.name,
           email: data.email,
           phone: data.phone || '',
           subject: data.subject,
           message: data.message,
         },
       });
       
       // Send email notification
       await resend.emails.send({
         from: 'Kusina Contact <onboarding@resend.dev>',
         to: 'your-email@example.com',
         subject: \`New Contact: \${data.subject}\`,
         html: \`
           <h2>New Contact Form Submission</h2>
           <p><strong>Name:</strong> \${data.name}</p>
           <p><strong>Email:</strong> \${data.email}</p>
           <p><strong>Phone:</strong> \${data.phone}</p>
           <p><strong>Message:</strong></p>
           <p>\${data.message}</p>
         \`,
       });
       
       return NextResponse.json({ success: true, id: submission.id });
     } catch (error) {
       return NextResponse.json({ error: 'Failed to process' }, { status: 500 });
     }
   }
   ```

## Recommendation

**For quick setup**: Use **Web3Forms** or **Formspree** - no backend needed, just update the handleSubmit function.

**For professional use**: Use **Resend** with Next.js API routes - gives you full control and is very reliable.

**For data persistence**: Use **Option 3** with Prisma - stores submissions in database for future reference.

## Additional Enhancements

### Add reCAPTCHA (Prevent Spam)

1. **Install**:
   ```bash
   npm install react-google-recaptcha
   ```

2. **Add to form**:
   ```typescript
   import ReCAPTCHA from 'react-google-recaptcha';
   
   <ReCAPTCHA
     sitekey="YOUR_SITE_KEY"
     onChange={(token) => setRecaptchaToken(token)}
   />
   ```

### Add Form Validation

Use **Zod** for schema validation:
```bash
npm install zod
```

```typescript
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
```

## Environment Variables

Create `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
WEB3FORMS_ACCESS_KEY=xxxxxxxxxxxxx
RECAPTCHA_SITE_KEY=xxxxxxxxxxxxx
DATABASE_URL=postgresql://...
```

Choose the option that best fits your needs and budget!
