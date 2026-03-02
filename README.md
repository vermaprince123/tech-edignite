# Tech Edignite - SVNIT College Blog Platform

A professional educational blog platform for SVNIT (Sardar Vallabhbhai National Institute of Technology) students, providing branch-wise educational content, tutorials, and resources.

## 🌟 Features

- **Branch-wise Blog Organization**: Content organized by B.Tech branches (CSE, ECE, EE, ME, CE, CHE, IT)
- **Professional Design**: Modern, clean, and responsive UI
- **Blog Filtering**: Filter blogs by engineering branch
- **Contact Form**: Integrated Web3Forms with hCaptcha spam protection
- **Dark Mode**: Theme toggle for better viewing experience
- **Responsive Design**: Works beautifully on all devices
- **Smooth Animations**: Engaging animations with Framer Motion

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Theme**: next-themes
- **Email Service**: Web3Forms

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## 📝 Blog Content

The platform currently includes 1-2 blog posts for each B.Tech branch:

- **CSE**: Data Structures & Algorithms, React.js
- **ECE**: Digital Signal Processing, Microcontrollers
- **EE**: Power Systems, Control Systems
- **ME**: Thermodynamics, CAD & Manufacturing
- **CE**: Structural Engineering, Transportation Engineering
- **CHE**: Process Engineering, Reaction Engineering
- **IT**: Database Management, Network Security

## 📧 Email Service Setup

This website uses **Web3Forms** (free, unlimited emails) to handle contact form submissions with **hCaptcha** spam protection.

### Setup Instructions:

1. **Get your free access key:**
   - Visit [https://web3forms.com](https://web3forms.com)
   - Sign up for a free account (no credit card required)
   - Create a new access key
   - Add your email as the recipient
   - **Enable hCaptcha** in your Web3Forms dashboard

2. **Configure environment variable:**
   - Create a `.env.local` file in the root directory
   - Add your access key:
     ```
     NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
     ```

3. **Restart your development server**

### Features:
- ✅ Free forever
- ✅ Unlimited emails per month
- ✅ No API rate limits
- ✅ hCaptcha spam protection (already integrated)
- ✅ Automatic captcha reset after form submission

## 🔗 Links

- **SVNIT Official**: [https://www.svnit.ac.in/](https://www.svnit.ac.in/)
- **Edignite NGO**: [https://edignitengo.org/](https://edignitengo.org/)
- **Portfolio**: [https://prince.edignitengo.org/](https://prince.edignitengo.org/)

## 📁 Project Structure

```
tech-edignite/
├── app/
│   ├── blog/
│   │   ├── [id]/
│   │   └── page.tsx
│   ├── branches/
│   ├── contact/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── sections/
│   ├── ui/
│   ├── footer.tsx
│   ├── navbar.tsx
│   └── ...
├── lib/
│   ├── data.ts
│   ├── utils.ts
│   └── theme-provider.tsx
└── public/
```

## 🎨 Customization

Edit the data in `lib/data.ts` to customize:
- Site information
- Blog posts
- Branch information
- Contact details

## 🌐 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm run build
```

## 📄 License

MIT

## 🙏 Acknowledgments

- Built for SVNIT students
- Powered by Edignite NGO
- Designed with modern web technologies
