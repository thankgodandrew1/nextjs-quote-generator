export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
    <footer className="py-4 bg-blue-500 text-white text-center">
      <p>&copy; {currentYear} ThankGod Andrew | WDD 430 | Updated: {new Date().toLocaleDateString()}</p>
    </footer>
  );

}