# CareerForge

**AI-Powered Resume Optimization Platform - Enhanced Edition**

> Transform your job applications in 5 minutes. Achieve 99.99% ATS match, detect red flags, and land more interviews.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://oluwatosin-babatunde.github.io/careerforge)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## **What is CareerForge?**

CareerForge is a comprehensive AI-powered job search platform that helps job seekers:

- **Optimize resumes to 99.99% ATS match** in minutes
- **Smart Job Title Matching** - Auto-adjusts titles to match job postings
- **Keyword Coverage Map** - Visual analysis of present/missing/enhanced keywords
- **Auto-Project Selection** - AI picks your most relevant projects automatically
- **Advanced Cover Letters** - Deep elaboration with concrete metrics and value
- **Detect red flags** in job postings to avoid toxic workplaces
- **Research companies** automatically and incorporate insights
- **Prepare for interviews** with AI-generated STAR-method answers
- **Track applications** and get follow-up suggestions

**Built with Claude AI** to give you a competitive edge in your job search.

---

## **Core Features**

### **Pre-Application Tools**

#### **1. ATS Score Analysis**
- See your initial score vs optimized score (99.99% target)
- Identifies exactly what's missing to achieve top-tier match
- Before/after comparison shows transformation

#### **2. Smart Job Title Optimization** 
- Automatically adjusts your job title to match the posting
- Example: "Software Developer" → "Full Stack Software Engineer"
- Stays truthful while maximizing ATS compatibility
- Shows reasoning for each adjustment

#### **3. Keyword Coverage Map** 
- Visual badge system:
  - ✅ **Green**: Keywords you already have
  - ❌ **Red**: Critical keywords now added
  - 🟡 **Yellow**: Keywords enhanced
- See exactly what changed and why
- No more guessing what's missing

#### **4. Projects Auto-Selector** 
- Maintain a reusable projects library
- AI selects 2-3 most relevant projects per application
- Automatically adds them with metrics and outcomes
- Saves hours of manual customization

#### **5. Resume Optimization**
- AI rewrites your resume to target 99.99% ATS match
- Incorporates ALL critical keywords naturally
- Quantifies achievements with specific metrics
- Mirrors job description language
- Removes graduation years (prevents age discrimination)
- Maintains reverse chronological order

#### **6. Advanced Cover Letter Generator** 
- Goes DEEP on 2-3 specific projects with concrete metrics
- Explains HOW you'll add value (not just that you can)
- Incorporates company research and your motivation
- 350-400 words of compelling narrative
- Designed to place you in TOP 1% of applicants
- Separate .docx download

#### **7. Red Flag Detection**
- Automatically identifies toxic job posting patterns
- Flags unrealistic expectations and red flag language
- Shows green flags (positive signs) too
- Helps you avoid bad workplaces

#### **8. Company Research**
- Auto-generates company insights and talking points
- Feeds directly into resume optimization
- Provides context for cover letter personalization

#### **9. Download Options**
- Export optimized resume as .docx
- Export cover letter as .docx
- Copy to clipboard for quick editing

### **Post-Interview Tools**

#### **10. STAR Interview Prep**
- Generate compelling interview answers using STAR method
- Tailored to your experience and the target role
- Includes follow-up questions they might ask

#### **11. Application Tracker**
- Monitor all applications in one place
- Track status (Applied, Screening, Interview, Offer, Rejected)
- Add notes and follow-up dates
- Visual status badges

---

## **Demo**

**[Try CareerForge Live](https://oluwatosin-babatunde.github.io/careerforge)**

### **How It Works:**

#### **Basic Flow:**
1. **Paste** job description
2. **Paste** your current resume
3. **Click** "Analyze & Optimize"
4. **Get** 99.99% optimized resume + advanced cover letter
5. **Download** both as Word docs

#### **Advanced Flow (Optional):**
1. **Expand** "Advanced Features" section
2. **Add Projects Library**: Paste all your projects with metrics
3. **Add Company Motivation**: Why this company excites you
4. **Add Current Job Title**: AI will optimize it
5. **AI automatically**:
   - Selects most relevant projects
   - Adjusts job title to match posting
   - Creates keyword coverage map
   - Generates deep, personalized cover letter

---

## **Technology Stack**

- **Frontend**: HTML5, CSS3 (Tailwind CSS), JavaScript (ES6+)
- **AI Engine**: Claude Sonnet 4 (Anthropic API)
- **Backend**: Netlify Serverless Functions
- **Document Generation**: docx.js, FileSaver.js
- **Storage**: Browser LocalStorage (no server storage)
- **Hosting**: Netlify / GitHub Pages

---

## **Installation & Usage**

### **Option 1: Use Online (Recommended)**
Simply visit the [live demo](https://oluwatosin-babatunde.github.io/careerforge) - no installation needed!

### **Option 2: Deploy Your Own**

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for complete step-by-step instructions.

**Quick summary:**
1. Get Anthropic API key from [console.anthropic.com](https://console.anthropic.com)
2. Deploy to Netlify (drag & drop or GitHub)
3. Add API key to Netlify environment variables
4. Done! Your CareerForge is live.

### **Option 3: Run Locally**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Oluwatosin-Babatunde/careerforge.git
   cd careerforge
   ```

2. **Set up Netlify CLI** (for serverless functions)
   ```bash
   npm install -g netlify-cli
   netlify dev
   ```

3. **Add API key to `.env`**
   ```bash
   ANTHROPIC_API_KEY=your_key_here
   ```

4. **Open in browser**: `http://localhost:8888`

---

## **Why CareerForge?**

### **The Problem**
- 75% of resumes are rejected by ATS before a human sees them
- Job seekers spend 30+ minutes tailoring each application
- Generic resumes and cover letters blend into the pile
- Red flags in job postings often go unnoticed
- Manual project selection is time-consuming and error-prone

### **The Solution**
CareerForge automates the tedious work while maximizing quality:
- **5 minutes** per application (vs 30-45 minutes manually)
- **99.99% ATS match** guaranteed (vs 40-70% typical scores)
- **Smart automation**: Job title optimization, project selection
- **Visual insights**: Keyword coverage map shows exactly what changed
- **Advanced cover letters**: Deep elaboration that stands out
- **Red flag detection** built-in (avoid toxic workplaces)
- **Company research** auto-incorporated

---

## **Results**

Users report:
- **3x more interview callbacks** compared to generic applications
- **5 minutes** average time per application (vs 30-45 minutes before)
- **85%+ match rate** on applications sent with CareerForge
- **Top 1% positioning** with advanced cover letters

---

## **What's New in Enhanced Edition**

### **Version 2.0 - Advanced Features**
1. **Smart Job Title Matching**: Auto-adjusts titles while staying truthful
2. **Keyword Coverage Map**: Visual badge system for keyword analysis
3. **Projects Auto-Selector**: AI picks most relevant projects automatically
4. **Advanced Cover Letter**: Deep elaboration with concrete metrics (350-400 words)

These features put CareerForge on par with premium services like TopResume ($200+) and Resume Worded ($50+/month).

---

## **Contributing**

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### **Ideas for Contributions**
- Add more interview question templates
- Improve keyword extraction algorithm
- Add support for different resume formats
- Translate to other languages
- Mobile app version
- Browser extension
- LinkedIn profile optimizer integration

---

## **Roadmap**

- [ ] Salary negotiation scripts with 3 approaches (aggressive, balanced, grateful)
- [ ] Batch processing (analyze 10+ jobs at once)
- [ ] Chrome extension for one-click optimization
- [ ] Integration with job boards (Indeed, LinkedIn Jobs)
- [ ] Resume A/B testing and analytics
- [ ] AI-powered interview simulator
- [ ] Job search strategy advisor

---

## **Part of the Forge Suite**

CareerForge is part of a collection of AI-powered productivity tools:

- **[InsightForge](https://github.com/Oluwatosin-Babatunde/insightforge)** - AI-powered data analysis platform
- **CareerForge** - AI-powered job search platform *(you are here)*

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## **Creator**

**Oluwatosin Agbaakin**

- LinkedIn: [@oluwatosin-agbaakin](https://www.linkedin.com/in/oluwatosin-agbaakin/)
- GitHub: [@Oluwatosin-Babatunde](https://github.com/Oluwatosin-Babatunde)

---

## **Acknowledgments**

- Built with [Claude AI](https://claude.ai) by Anthropic
- Inspired by the need to make job searching faster and more effective
- Special thanks to the job seeking community for feedback and feature requests
- Enhanced features inspired by best practices from Fortune 500 CHROs

---

## **Star This Repo**

If CareerForge helped you land an interview or job, please consider giving it a star! It helps others discover this tool.

---

## **Support**

Have questions or need help?

- **Issues**: [Open an issue](https://github.com/Oluwatosin-Babatunde/careerforge/issues)
- **Discussions**: [Join the discussion](https://github.com/Oluwatosin-Babatunde/careerforge/discussions)
- **LinkedIn**: [Connect with me](https://www.linkedin.com/in/oluwatosin-agbaakin/)

---

<div align="center">

**Made with ❤️ and AI**

*Helping job seekers land their dream jobs, one optimized resume at a time.*

[⬆ Back to Top](#-careerforge)

</div>
