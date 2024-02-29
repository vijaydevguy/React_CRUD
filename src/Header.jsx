
const Header = ({title}) => {

  return (
    <header>
      <p>{title}</p>
    </header>
  )
}

Header.defaultProps = {
  title: "Todo List"
}

export default Header
