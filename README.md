# Learning.Programing

> A modern web application built with ASP.NET Core for learning and demonstrating enterprise-level programming concepts and best practices.

## 🎯 Project Overview

**Learning.Programing** is a comprehensive business application developed as part of an DotNet Programming workshop. The project demonstrates modern web development practices using ASP.NET Core Razor Pages with a focus on creating professional, enterprise-grade user interfaces and business functionality.

## 🏗️ Architecture

```
Learning.Programing/
├── src/
│   └── Learning.Programing.Frontend/     # ASP.NET Core Web Application
│       ├── Pages/                        # Razor Pages
│       │   ├── SalesOrders/             # Sales Order Management
│       │   ├── Dashboard/               # Dashboard Pages
│       │   └── Shared/                  # Shared Layouts & Components
│       ├── wwwroot/                     # Static Assets
│       └── Program.cs                   # Application Entry Point
├── public/                              # HTML Prototypes & Templates
└── Learning.Programing.sln             # Solution File
```

## 🚀 Features

### Core Functionality
- **Sales Order Management**: Complete CRUD operations for sales orders
- **Professional Dashboard**: Business intelligence and analytics views
- **Customer Management**: Customer information handling
- **Product Search**: Advanced product selection with search capabilities
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Technical Features
- **Modern UI/UX**: Built with Tailwind CSS and Font Awesome icons
- **Interactive Components**: Dynamic forms with JavaScript functionality
- **Professional Layouts**: Sidebar and horizontal navigation patterns
- **Enterprise-Grade Forms**: Complex business forms with validation
- **Real-time Calculations**: Dynamic totals and pricing calculations

## 🛠️ Technology Stack

### Backend
- **Framework**: ASP.NET Core 9.0
- **Language**: C# with .NET 9.0
- **Architecture**: Razor Pages (Server-side rendering)
- **Configuration**: JSON-based configuration management

### Frontend
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome 6.0
- **JavaScript**: Vanilla JS for interactivity
- **Layout**: Responsive design with CSS Grid and Flexbox

### Development Tools
- **IDE**: Visual Studio / VS Code
- **Version Control**: Git
- **Solution Management**: .NET Solution (.sln)

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- [.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) or [VS Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)

## 🎯 Tailwind Integration
- **Initialize NPM and install Tailwind CSS**
  ```bash
  npm init -y
  npm install -D tailwindcss@latest @tailwindcss/cli@latest
  ```

- **Configure content paths:**
  ```javascript
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      './Pages/**/*.cshtml',
      './Views/**/*.cshtml',
      './**/*.razor', // For Blazor projects
      './wwwroot/**/*.html',
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  ```

- **Add Tailwind directives to your CSS:** Create an input CSS file (e.g., wwwroot/css/site.css) and add the @import directives:
  ```css
  @import "tailwindcss";
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  ```

- **Add build scripts to `package.json`**
  ```json
  "scripts": {
    "css:build": "npx @tailwindcss/cli -i ./wwwroot/css/site.css -o ./wwwroot/css/styles.css --minify",
    "css:watch": "npx @tailwindcss/cli -i ./wwwroot/css/site.css -o ./wwwroot/css/styles.css --watch"
  }
  ```
- **Link the output CSS in your layout:**
  ```html
  <link rel="stylesheet" href="~/css/styles.css" asp-append-version="true" />
  ```

- **Run the watch process:**
  ```bash
  npm run css:watch
  dotnet watch run
  ```
  
## 🚦 Getting Started

### 1. Clone the Repository
```bash
git clone [repository-url]
cd dotnet-tailwind-app
```

### 2. Restore Dependencies
```bash
dotnet restore
```

### 3. Build the Solution
```bash
dotnet build
```

### 4. Run the Application
```bash
cd src/Learning.Programing.Frontend
dotnet run
```

### 5. Access the Application
Open your browser and navigate to:
- **HTTPS**: `https://localhost:7289`
- **HTTP**: `http://localhost:5289`

## 📁 Project Structure

### Pages Overview

#### **Sales Orders Module**
- **Index**: Sales order listing with filtering and search
- **New**: Create new sales orders with line items
- **Features**: Product search, dynamic calculations, professional forms

#### **Dashboard Module**
- Professional dashboard layouts
- Business metrics and KPIs
- Responsive design patterns

#### **Shared Components**
- **AdminLayout**: Professional admin template
- **Sidebar Navigation**: Dynamic navigation with active states
- **Responsive Headers**: Multi-level menu systems

### Static Assets
- **Public Folder**: HTML prototypes and design templates
- **WWWRoot**: Static assets for the web application

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Professional blue, green, and gray schemes
- **Typography**: Tailwind's font system with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind's scale
- **Components**: Reusable UI components with hover states

### Responsive Design
- **Mobile-First**: Designed for mobile devices first
- **Breakpoints**: Responsive across all device sizes
- **Navigation**: Collapsible sidebar for mobile devices
- **Forms**: Adaptive form layouts

### Interactive Elements
- **Modals**: Professional modal dialogs
- **Forms**: Dynamic form validation and feedback
- **Tables**: Sortable and filterable data tables
- **Dropdowns**: Multi-level navigation menus

## 📊 Business Functionality

### Sales Order Management
- Create, read, update, and delete sales orders
- Product selection with search capabilities
- Dynamic line item management
- Real-time total calculations
- Customer information management

### Product Management
- Product search and selection
- Inventory tracking display
- Pricing and category management
- Stock status indicators

### Customer Features
- Customer information forms
- Contact details management
- Order history tracking
- Professional data presentation

## 🔧 Development Guidelines

### Code Structure
- Follow ASP.NET Core conventions
- Use Razor Pages for server-side rendering
- Implement responsive design patterns
- Maintain clean code practices

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow consistent color schemes
- Implement proper typography hierarchy
- Ensure accessibility compliance

### JavaScript Best Practices
- Use modern ES6+ features
- Implement event delegation
- Follow unobtrusive JavaScript principles
- Ensure cross-browser compatibility

## 📈 Future Enhancements

### Planned Features
- **Database Integration**: Entity Framework Core implementation
- **Authentication**: User authentication and authorization
- **API Development**: RESTful API endpoints
- **Testing**: Unit and integration testing
- **Deployment**: Containerization with Docker

### Technical Improvements
- **State Management**: Advanced state management patterns
- **Performance**: Caching and optimization
- **Security**: Enhanced security measures
- **Monitoring**: Application logging and monitoring

## 🤝 Contributing

This project is part of an educational workshop. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📚 Learning Objectives

This project demonstrates:
- Modern web development with ASP.NET Core
- Professional UI/UX design principles
- Enterprise application architecture
- Business application development
- Responsive web design
- Clean code practices

## 🔗 Resources

- [ASP.NET Core Documentation](https://docs.microsoft.com/en-us/aspnet/core/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Font Awesome Icons](https://fontawesome.com/)
- [.NET 9.0 Documentation](https://docs.microsoft.com/en-us/dotnet/)

## 📄 License

This project is created for educational purposes as part of the DotNet Programming series.

---

**Note**: This is a learning project designed to demonstrate modern web development practices and enterprise application development with ASP.NET Core.
