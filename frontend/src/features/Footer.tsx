const Footer = () => {
  const date = new Date();

  return (
    <footer>&copy;{date.getFullYear()} MoviePicker All Rights Reserved</footer>
  );
};

export default Footer;
