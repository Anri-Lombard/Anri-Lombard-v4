function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 opacity-50">
            <div className="p-10 flex flex-col">
                <span className="flex-1 self-center">
                    &copy; {currentYear} Anri Lombard
                </span>
            </div>
        </nav>
    )
}

export default Footer;