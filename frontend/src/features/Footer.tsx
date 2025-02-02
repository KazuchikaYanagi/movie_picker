const Footer: React.FC = () => {
  const date = new Date();

  return (
    <footer className="text-center bg-purple-800">
      &copy;{date.getFullYear()} MoviePicker All Rights Reserved
    </footer>
  );
};

export default Footer;
