
const Footer = ({leng}) => {
  
    const year = new Date().getFullYear();

  return (
    <footer>
      <p style={{alignSelf:"center",justifySelf:"center"}}>{leng} List {leng <= 1 ? "item" : "items"}</p>
      <p>Copyright &copy; {year} </p>
    </footer>
  );
}

export default Footer;
