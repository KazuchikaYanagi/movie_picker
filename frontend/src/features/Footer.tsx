const Footer: React.FC = () => {
  const date = new Date();

  return (
    <footer>&copy;{date.getFullYear()} MoviePicker All Rights Reserved</footer>
  );
};

export default Footer;
