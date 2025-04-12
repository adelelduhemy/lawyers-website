# Law Firm Website

A modern, responsive website for law firms built with Node.js, Express, and MongoDB.

## 🚀 Technologies Used

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome (Icons)
- Google Fonts

### Backend
- Node.js
- Express.js
- MongoDB
- Nodemailer (Email Service)

## 📋 Features

- Responsive Design
- Modern UI with Animations
- Contact Form with Email Notifications
- Service Showcase
- Team Member Profiles
- Client Testimonials
- Mobile-Friendly Interface

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/lawyers-website.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```
MONGODB_URI=mongodb://localhost:27017/law_firm_db
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
```

4. Start the server:
```bash
node server.js
```

5. Open your browser and navigate to:
```
http://localhost:5000
```

## 📁 Project Structure

```
lawyers-website/
├── index.html          # Main HTML file
├── style.css          # Stylesheet
├── script.js          # Frontend JavaScript
├── server.js          # Backend Server
├── package.json       # Project Dependencies
└── .env              # Environment Variables
```

## 🎨 Customization

### Changing Colors
Edit `style.css` to modify the color scheme:
- Primary: #003366
- Secondary: #004080
- Accent: #ffcc00

### Updating Content
- Team Members: Edit the team section in `index.html`
- Services: Update the services section in `index.html`
- Contact Information: Modify the contact form in `index.html`

## 📧 Contact Form Setup

1. Configure email settings in `server.js`:
```javascript
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
```

2. Update the recipient email in the contact form handler.

## 🔒 Security

- Environment variables for sensitive data
- CORS configuration for API security
- Input validation for contact form
- Rate limiting for API endpoints
- Secure headers configuration

## 🌐 Deployment

1. Set up a MongoDB database:
   - Use MongoDB Atlas (recommended)
   - Create a new cluster
   - Get your connection string
   - Set up database access and network access

2. Configure environment variables on your hosting platform:
   - Add MONGODB_URI
   - Add EMAIL_USER and EMAIL_PASS
   - Set NODE_ENV to 'production'

3. Deploy the Node.js application:
   - Recommended platforms: Heroku, DigitalOcean, or AWS
   - Set up PM2 for process management
   - Configure SSL certificate

4. Set up a domain name:
   - Purchase a domain
   - Configure DNS settings
   - Set up SSL certificate

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop (1920px and above)
- Laptop (1366px - 1919px)
- Tablet (768px - 1365px)
- Mobile (320px - 767px)

## 🎯 Performance

- Optimized images (WebP format)
- Minified CSS and JavaScript
- Efficient code structure
- Fast loading times (< 3s)
- Lighthouse score > 90

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email: support@your-law-firm.com

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Unsplash for stock images
- Express.js team for the amazing framework
- MongoDB for the database solution 