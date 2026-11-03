const NavbarLinks = () => {
    const links = [
        {text: 'Dashboard', path: '/'},
        {text: 'Projects', path: '/projects'},
        {text: 'Chats', path: '/chats'},
        {text: 'Meetings', path: '/meetings'},
        {text: 'Reports', path: '/reports'},
    ]
  return (
    <ul className="flex gap-[19px] py-1 pl-1 pr-2 bg-background-main rounded-[100px]">
        {links.map((link, index) => (
            <li key={index}>
                <a href={link.path} className="text-caption-small  font-normal p-2.5 rounded-[100px] leading-4 transition duration-300 hover:bg-primary-blue-500 hover:text-white">
                    {link.text}
                </a>
            </li>
        ))}
    </ul>
  )
}

export default NavbarLinks