export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-6 px-4">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {currentYear} Room Forge. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
